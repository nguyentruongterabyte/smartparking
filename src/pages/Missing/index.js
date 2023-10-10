import Error from '~/components/Error';

const Missing = () => {
  return (
    <Error
      errorCode={404}
      message="The page you are looking for might have been removed had its name changed or is temporarily unavailable."
    />
  );
};

export default Missing;
