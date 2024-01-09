import { Card, Directory, TextBox } from "../components";

const HomePage = () => {
  return (
    <>
      <Card className="max-w-2xl mx-auto py-6">
        <Card className="relative">
          <TextBox handleOnChange={() => {}} />
        </Card>
      </Card>
      <Directory />
    </>
  );
};

export default HomePage;
