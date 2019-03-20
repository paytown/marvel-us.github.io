import { auth, wishlistByUserRef, libraryByUserRef } from '../firebase/firebase.js';

export function makeResultListTemplate(comic) {
    const html = /*html*/ `
    <div id="result-card">
        <div style="background-image: url(${comic.thumbnail.path}.${comic.thumbnail.extension})" id="result-card-image">
            <div id="result-card-h2">
                <h2>${comic.title}</h2>
            </div>
        </div>

        <div id="result-card-bottom">
            <span id="result-information">Issue: ${comic.issueNumber} | ${comic.series.name}</span>
            <span id="result-user-control">
                <img src="assets/icons/library-noselect.svg" id="library-icon" class="library-icon" alt="library">  
                <img src="assets/icons/wishlist-noselect.svg" id="wishlist-icon" alt="wishlist">
            </span>
        </div>
    </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultsList = document.getElementById('results-list');

export default function loadComicList(comics) {
    while(resultsList.firstChild) {
        resultsList.firstChild.remove();
    }
    
    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);

        // append last
        
        const library = html.getElementById('library-icon');
        // const library = html.querySelector('#library-icon');
        const wishlist = html.querySelector('#wishlist-icon');
        
        const userId = auth.currentUser.uid;
        const userLibraryRef = libraryByUserRef.child(userId);
        const userLibraryComicRef = userLibraryRef.child(comic.id);
        userLibraryComicRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            let inLibrary = false;
            if(value) {
                addToLibrary();
            } else {
                removeFromLibrary();
            }
            
            function addToLibrary() {
                console.log('added');
                inLibrary = true;
                library.src = "assets/icons/library-select.svg";
            }
            
            function removeFromLibrary() {
                console.log('removed');
                inLibrary = false;
                library.src = "assets/icons/library-noselect.svg"
            }
            
            library.addEventListener('click', () => {
                if(inLibrary) {
                    userLibraryComicRef.remove();
                    removeFromLibrary();
                } else {
                    userLibraryComicRef.set( {
                        title: comic.title,
                        seriesName: comic.series.name,
                        thumbnailPath: comic.thumbnail.path,
                        thumbnailExtension: comic.thumbnail.extension,
                        issue: comic.issueNumber
                    });
                    addToLibrary();
                }
            })
        })
        
        resultsList.appendChild(html);

        // const userWishlistRef = wishlistByUserRef.child(userId);
        // const userWishlistComicRef = userWishlistRef.child(comic.title);


    });
}