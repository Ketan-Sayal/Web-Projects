import { Card } from "@/components";
import { getCollection } from "@/lib/db"
import { getUser } from "@/lib/getUser";
import { ObjectId } from "mongodb";

const page = async() => {
    const user = await getUser();
    const booksCollection = await getCollection("books");
    const readingBooks = await booksCollection.find({userId:ObjectId.createFromHexString(user._id)}).toArray();

  return (
    <div className='w-full my-6 mx-3 h-full grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
      {readingBooks.map((book, i)=>(
        <Card key={i} book={book}/>
      ))}
    </div>
  )
}

export default page
