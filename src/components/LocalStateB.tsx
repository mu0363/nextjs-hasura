import { VFC, FormEvent, ChangeEvent, useState } from "react";
import { todoVar } from "src/cash";
import { useReactiveVar } from "@apollo/client";
import Link from "next/link";

export const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar);

  return (
    <div>
      {todos?.map((task, index) => (
        <p key={index} className="mb-3">
          {task.title}
        </p>
      ))}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </div>
  );
};
