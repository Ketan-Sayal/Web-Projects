"use server"
import { Card } from "@/components";
import { getCollection } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { BookOpen, Plus } from "lucide-react";
import { ObjectId } from "mongodb";
import Link from "next/link";

const page = async() => {
    // const [searchTerm, setSearchTerm] = useState('');
  // const [filter, setFilter] = useState('all');

  // Sample data - replace with actual database data
  const user = await getUser();
  const bookCollection = await getCollection("books");

  const books = (await bookCollection?.find({userId:ObjectId.createFromHexString(user._id)}).toArray()).reverse();

  const recentBooks = books;

  const numberOfWantToRead = books?.filter((book)=>book.status==="want-to-read");
  const numberOfCompleted = books?.filter((book)=>book.status==="completed");
  const numberOfCurrlentlyReading = books.filter((book)=>book.status==="currently-reading");
  

  

  
  return (
    <div className='w-full h-full'>
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Your Personal Library</h1>
          <p className="text-xl text-gray-300 mb-8">Track, organize, and discover your next great read</p>
          
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-black">
              <div className="text-3xl font-bold text-black">{books.length}</div>
              <div className="text-gray-600">Total Books</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-gray-300">
              <div className="text-3xl font-bold text-gray-600">{numberOfWantToRead.length}</div>
              <div className="text-gray-600">Want to Read</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-blue-300">
              <div className="text-3xl font-bold text-blue-600">{numberOfCurrlentlyReading.length}</div>
              <div className="text-gray-600">Currently Reading</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-green-300">
              <div className="text-3xl font-bold text-green-600">{numberOfCompleted.length}</div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Books Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Recently Added</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBooks.map((book) => (
              <Card book={book} key={book._id}/>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/home/add-book" className="bg-white text-black p-6 rounded-lg hover:bg-gray-200 transition-colors">
              <Plus className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Add New Book</h3>
              <p className="text-gray-600">Add a book to your library</p>
            </Link>
            
            <Link href="/home/reading-list" className="bg-white text-black p-6 rounded-lg hover:bg-gray-200 transition-colors">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Currently Reading</h3>
              <p className="text-gray-600">View your active reads</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
