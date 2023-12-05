"use client";
import { useState } from "react";

type Props = { img: string };

const TestForm: React.FunctionComponent<Props> = ({ img }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    image: img,
    description: "test desc",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
      } else {
        // Handle errors
        console.error("Error adding user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>no content</h1>
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default TestForm;
