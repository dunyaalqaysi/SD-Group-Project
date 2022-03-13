from crypt import methods
import json
from flask import request, make_response
from flask import current_app as app

from .models import user
from . import db

@app.route('/', methods=['POST'])
def login():
    print("Received: ", request.form['email'], request.form['password'])
    return json.dumps('connected successfully to login endpoint on submission')

@app.route('/profile', methods=['POST'])
def profile_details():
    print("Got: ", list(request.form))
    return json.dumps("connected succesfully to profile endpoint on submission")