import UpdateForm from "@/components/UpdateForm";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
// import { useRouter } from "next/navigation";


export default async function AddBookForm({params}) {
  const {id} = await params;
    const bookCollection = await getCollection("books");
    const book = await bookCollection?.findOne({_id:ObjectId.createFromHexString(id)});
    // console.log(book);
    const data = await JSON.parse(JSON.stringify(book));
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Book</h1>
          <p className="text-gray-600">Update book to your personal library</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <UpdateForm book={data}/>
        </div>
      </div>
    </div>
  );
}
