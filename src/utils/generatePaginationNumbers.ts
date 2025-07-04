
export const generatePagination = ( currentPage: number, totalPages: number ) => {
  // If the total number of pages is 7 or less
  // [1, 2, 3, 4, 5, 6, 7]
  if ( totalPages <= 7 ) return Array.from({ length: totalPages }, (_, i) => i + 1);

  // If the currentPage is between the first 3 pages
  if ( currentPage <=3 ) return [1, 2, 3, '...', totalPages - 1, totalPages];

  // If the currentPage is in between the last 3 pages
  if ( currentPage >= totalPages - 2) return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];

  // If the currentPage is somewhere in between
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];

}