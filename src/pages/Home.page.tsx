import { Card, Directory, TextBox } from "../components";
interface HomeProps {
  myCollection: [];
  handleSubmit: () => void;
  handleOnChange?: () => void;
}
const HomePage = ({
  handleOnChange,
  myCollection,
  handleSubmit,
}: HomeProps) => {
  return (
    <>
      <Card className="max-w-2xl mx-auto py-6">
        <Card className="relative">
          <TextBox handleOnChange={handleOnChange} />
        </Card>
      </Card>
      <Directory myCollection={myCollection} handleClick={handleSubmit} />
    </>
  );
};

export default HomePage;
