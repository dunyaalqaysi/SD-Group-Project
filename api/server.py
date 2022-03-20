import json
from flask import request, make_response
from flask import current_app as app
from .forms import (LoginForm, ProfileForm, QuoteForm, RegisterForm)
from .models.user import Users
import datetime
from . import db

#login route
@app.route('/', methods=['POST'])
def login():
    login_form = LoginForm(request.form)
    if not login_form.validate():
        return make_response(login_form.errors, 500)
    return make_response("", 200)

@app.route('/profile', methods=['POST'])
def profile_details():
    prof_form = ProfileForm(request.form)
    prof_form.strip_fields(prof_form)
    if not prof_form.validate():
        return make_response(prof_form.errors, 500)
    print(prof_form.form_errors)
    return make_response("", 200)
    
@app.route('/register', methods=['POST'])
def register():
    register_form = RegisterForm(request.form)
    if not register_form.validate():
        return make_response(register_form.errors, 500)
    return make_response("", 200)

@app.route('/quote', methods=['POST'])
def get_quote():
    quote_form = QuoteForm(request.form)
    print(quote_form.data)
    if not quote_form.validate():
        return make_response(quote_form.errors, 500)
    return make_response("", 200)

