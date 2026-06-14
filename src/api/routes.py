"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password', status_code=400)

    # Check if user exists
    user1 = User.query.filter_by(email=body["email"]).first()
    if user1:
        raise APIException('Email already exists', status_code=400)

    # create the new user
    new_user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password', status_code=400)

    # validate that the front-end request was built correctly
    user = User.query.filter_by(email=body["email"], password=body["password"]).first()

    if user is None:
        raise APIException('Bad email or password', status_code=401)

    # Create the token and send it to the client
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token)

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    # Access the identity of the current user with get_jwt_identity
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        raise APIException("User not found", status_code=404)

    return jsonify({
        "message": "Welcome to the private zone",
        "user": user.serialize()
    }), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200