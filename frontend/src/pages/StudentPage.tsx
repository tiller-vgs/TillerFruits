import Footer from "../components/Footer";
import useAssignments from "../utils/useAssignments";

function StudentPage() {
  const allUserAssignments = useAssignments();
  const receivedAssignments = allUserAssignments.newAssignments;
  const userIsCreatorAssignments = allUserAssignments.myAssignments;

  console.log(allUserAssignments);
  return (
    <main
      id="mainWrapperWithFooter"
      className="flex flex-col min-h-[calc(100dvh-65px)] min-w-full p-5"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-bold text-2xl">Dette er en studentside</h1>
        <h2>
          For øyeblikket er oppgaver du blir tildelt det eneste du kan se på
          siden
        </h2>
      </div>

      <p>Filer å sende tilbakemelding på:</p>
      <section id="NewFileList" className="w-1/3 border-2 rounded-2xl p-2 px-5">
        {receivedAssignments.map((assignment) => (
          <h1>{assignment.originalName}</h1>
        ))}
      </section>

      <p>Mine filer:</p>
      <section id="NewFileList" className="w-1/3 border-2 rounded-2xl p-2 px-5">
        {userIsCreatorAssignments.map((assignment) => (
          <h1>{assignment.originalName}</h1>
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default StudentPage;
