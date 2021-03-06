import { auth, libraryByUserRef } from '../firebase/firebase.js';
import loadComics from '../comics/comic-list-components.js';
import loadHeader from '../shared/header.js';
import objectToArray from '../object-to-array.js';

const wishlist = document.getElementById('wishlist-icon');

loadHeader();

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = libraryByUserRef.child(userId);
    userLibraryRef.on('value', snapshot => {
        const value = snapshot.val();
        const comics = objectToArray(value);
        loadComics(comics);
    });
});

// wishlist.addEventListener('click', () => {
//     console.log('hi');
// })
