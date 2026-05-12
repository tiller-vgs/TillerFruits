import useAssignments from "../utils/useAssignments";

function StudentPage() {
  const allUserAssignments = useAssignments();
  console.log(allUserAssignments);
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-bold text-2xl">Dette er en studentside</h1>
      <h2>For øyeblikket er det eneste du kan se oppgaver du blir tildelt</h2>

      {allUserAssignments.map((assignment) => (
        <div key={assignment.id}>
          <h3>{assignment.title}</h3>
          <p>{assignment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentPage;
