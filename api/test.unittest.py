import unittest
from api import app, db

class FlaskTest(unittest.TestCase):

    USERNAME = "Test1"
    
    REGISTER_AND_LOGIN_OBJ={
        "username":"Email",
        "password":"pass123"
    }

    TEST_ADDRESS= {
        "address":"1234 Test Address",
        "city":"Houston",
        "state":"TX",
        "zip":"77423"
    }

    


def test1_home(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:3002/')
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

def test2_Login(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:3002/api/login/',
        data=FlaskTest.LOGIN_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

def test3_register(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:3002/api/register/',
        data=FlaskTest.REGISTER_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

def test4_profile_equal_address(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:3002/api/profile?username=' + FlaskTest.CURR_USERNAME,
        data=FlaskTest.PROFILE_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

if __name__== "__main__":
    unittest.main()