const Countries = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return (
    <>
      <div>hello {id}</div>
    </>
  );
};

export default Countries;
