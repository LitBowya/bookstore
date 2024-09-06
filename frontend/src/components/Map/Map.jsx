import { Container } from "@mui/material";

const Map = () => {
  return (
    <div className="py-5 bg-white">
      <Container>
        <iframe
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15883.211066116812!2d-0.2234766!3d5.5961352!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a29c0df5a4f%3A0x95876935d7d102f9!2sGhana%20Communication%20Technology%20University!5e0!3m2!1sen!2sgh!4v1725629970507!5m2!1sen!2sgh"
        ></iframe>
      </Container>
    </div>
  );
};

export default Map;
