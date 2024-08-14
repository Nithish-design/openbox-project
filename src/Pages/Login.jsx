import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card className="text-center" style={{ width: "24rem" }}>
          <Card.Body>
            <Card.Title>Create New Account</Card.Title>
            <Card.Text>
              <Button variant="default">Sign up with Google</Button>
            </Card.Text>
            <Button variant="primary">Create an Account</Button>
          </Card.Body>
          <Card.Body>
            <Card.Text>
              Already have an account?{" "}
              <Card.Link href="https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:3000/#/dashboard">Sign In</Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
