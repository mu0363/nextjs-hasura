import { VFC } from "react";
import { Layout } from "src/components/Layout";
import { LocalStateB } from "src/components/LocalStateB";

const LocalStatePageB: VFC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateB />
    </Layout>
  );
};

export default LocalStatePageB;
