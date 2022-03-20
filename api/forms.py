from flask_wtf import FlaskForm
from wtforms import (StringField, PasswordField,
                     IntegerField, DecimalField, ValidationError, DateField)
from wtforms.validators import (
    InputRequired, Length, Email, DataRequired, NumberRange, Optional, AnyOf)
from .constants import states
from datetime import datetime
import re

def addStartsWithNum(form, field):
    found = re.match("^[0-9]+", field.data)
    if not found:
        raise ValidationError("Address must start with a number.")

class IsDate(object):
    def __init__(self, message=None) -> None:
        if not message:
            message = "Incorrect date format"
        self.message = message
    def __call__(self, form, field: StringField):
        res_date = field.data
        try:
            test = datetime.strptime(res_date, "%a %b %d %Y")
            field.data = test
        except:
            raise ValidationError(self.message)

class IsNumber(object):
    def __init__(self, message=None) -> None:
        if not message:
            message = "Must be a number."
        self.message = message

    def __call__(self, form, field):
        valid = re.match("^[0-9-.]*$", str(field.data))
        if not valid:
            raise ValidationError(self.message)


class IsAlpha(object):
    def __init__(self, message=None) -> None:
        if not message:
            message = "Must be alphabetic."
        self.message = message

    def __call__(self, form, field):
        valid = re.match("^[A-Za-z ]*$", field.data)
        if not valid:
            raise ValidationError(self.message)


class RegisterForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(),
                                             Email(message="Please enter a valid email.")])
    password = PasswordField('password', validators=[
                             DataRequired(message="Please enter a password.")])


class LoginForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(),
                                             Email(message="Please enter a valid email.")])
    password = PasswordField('password', validators=[
                             InputRequired(message="Please enter a password.")])


class ProfileForm(FlaskForm):
    fullName = StringField('Full Name', validators=[
                        InputRequired("Please enter a name."), 
                        Length(min=1, max=32, message="Please enter a name between 1-32 characters."), 
                        IsAlpha(message="Name must only contain alphabetic characters.")])
    add1 = StringField( 'Address Line 1', validators=[InputRequired(message="Please provide an address."), addStartsWithNum])
    add2 = StringField('Address Line 2', validators=[Optional(True)])
    state = StringField('state', validators=[
                        InputRequired(message="Please enter a valid US State."), 
                        AnyOf(states, message="Please enter a valid US state.")])
    city = StringField('City', validators=[
                       InputRequired(message="Please enter a city."),
                       IsAlpha(message="City must only be alphabetic characters.")])
    zipCode = StringField('Zip Code', validators=[
                        InputRequired(message="Please enter a zip code."),
                        Length(min=5, max=10, message="Please enter a 5-10 digit zip code."),
                        IsNumber(message="Zip Code must be number")])

    def strip_fields(form, all_fields: StringField):
        for field in all_fields:
            field.data = " ".join(field.data.split())


class QuoteForm(FlaskForm):
    gallons = IntegerField('Gallons', validators=[InputRequired(
        message="Please enter a number."), NumberRange(min=1, message="Please enter a number greater than 0."), IsNumber(message="Please enter a whole number.")])
    total = DecimalField('Total', validators=[InputRequired(), NumberRange(
        min=0.01, message="Cannot have a total less than 0."), IsNumber(message="Total must be a number.")])
    suggested = DecimalField('Suggested Price', validators=[InputRequired(), NumberRange(
        min=0.01, message="Cannot have a suggested price/gal less than 0."), IsNumber(message="Suggested price/gal must be a number.")])
    date = StringField('Date', validators=[InputRequired(message="Please enter a date."), IsDate(message="Invalid date format.")])

