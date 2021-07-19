import { VFC } from "react";
import { Layout } from "src/components/Layout";

const Home: VFC = () => {
  return (
    <Layout title="Home">
      <p className="text-3xl font-bold">Next.js + Graphql</p>
    </Layout>
  );
};

export default Home;
