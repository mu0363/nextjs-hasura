import { VFC } from "react";
import { Layout } from "src/components/Layout";
import { LocalStateA } from "src/components/LocalStateA";

const LocalStatePageA: VFC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  );
};

export default LocalStatePageA;
