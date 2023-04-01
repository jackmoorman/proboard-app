'use client';
import React from 'react';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

type Props = {};

function CreateProject({}: Props) {
  const [formDisplay, setDisplay] = useState(false);
  const projectTitle = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const submitProject = async (e: any) => {
    e.preventDefault();

    const body = {
      title: projectTitle?.current?.value,
    };

    await fetch('/api/board', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(body),
    });

    location.reload();
  };

  const ProjectForm = (
    <form onSubmit={(e) => submitProject(e)} className="flex flex-col gap-3">
      <input
        ref={projectTitle}
        type="text"
        placeholder="Project name"
        className=" p-2 text-lg text-slate-800 w-full rounded-md"
      />
      <button
        type="submit"
        className="shadow w-full p-1 rounded-md hover:scale-105 hover: hover:bg-neutral-300 transition-all"
      >
        Submit
      </button>
    </form>
  );

  return (
    <>
      <button
        onClick={() => setDisplay((prev) => !prev)}
        className="text-lg shadow w-full p-1 rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
      >
        {!formDisplay ? 'New Project' : 'Cancel'}
      </button>
      {formDisplay ? ProjectForm : null}
    </>
  );
}

export default CreateProject;
