import Footer from "../components/Footer";
import useAssignments from "../utils/useAssignments";

function StudentPage() {
  const allUserAssignments = useAssignments();
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

      <section id="NewFileList" className="w-1/3 border-2 rounded-2xl p-2 px-5">
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
        <p>THIS IS A FILEFILEFILEFILE WOWOWOWOWOWOWO</p>
      </section>
      <Footer />
    </main>
  );
}

export default StudentPage;
