import { VFC } from "react";
import { Layout } from "src/components/Layout";
import { CreateUser } from "src/components/CreateUser";

const HooksMemo: VFC = () => {
  return (
    <Layout title="Hooks Memo">
      <CreateUser />
    </Layout>
  );
};

export default HooksMemo;
