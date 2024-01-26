import Link from "next/link";

function Pagination({ prevLink, nextLink }) {
  return (
    <div className='flex justify-around items-center'>
      {prevLink !== null && (
        <Link className='rounded-md px-8 py-1 border' href={`/pokemon/${prevLink}`}>
          Prev
        </Link>
      )}
      <Link className='' href={`/pokemon/${nextLink}`}>
        Next
      </Link>
    </div>
  );
}
export default Pagination;
