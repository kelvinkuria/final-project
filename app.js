document.addEventListener('DOMContentLoaded', function () {
    const photoContainer = document.getElementById('photoContainer');
    const likeButton = document.getElementById('likeButton');
    const resetLikesButton = document.getElementById('resetLikesButton');
    const likeCountDisplay = document.getElementById('likeCount');
    const commentInput = document.getElementById('commentInput');
    const commentButton = document.getElementById('commentButton');
    const commentsList = document.getElementById('commentsList');
    const toggleCommentsButton = document.getElementById('toggleCommentsButton');
    const downloadImageButton = document.getElementById('downloadImageButton');
    const generateImageButton = document.getElementById('generateImageButton');
    const imageCategoryDropdown = document.getElementById('imageCategory');

    let likeCount = 0;
    let currentImageSrc = ''; // Track the current image source

    // Initial load
    generateRandomWaifu();

    // Event listener for the "Like" button
    likeButton.addEventListener('click', function () {
        likeCount++;
        updateLikeCount();
        displayMessage(`You liked the waifu image! Total likes: ${likeCount}`);
    });

    // Event listener for the "Reset Likes" button
    resetLikesButton.addEventListener('click', function () {
        likeCount = 0;
        updateLikeCount();
        displayMessage('Likes reset to zero.');
    });

    // Event listener for the image, loading a new random waifu image on click
    photoContainer.addEventListener('click', function () {
        generateRandomWaifu();
    });

    // Event listener for the "Generate Different Image" button
    generateImageButton.addEventListener('click', function () {
        generateRandomWaifu();
    });

    // Event listener for the "Add Comment" button
    commentButton.addEventListener('click', function () {
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            addComment(commentText);
            commentInput.value = '';
        }
    });

    // Event listener for the "Toggle Comments" button
    toggleCommentsButton.addEventListener('click', function () {
        toggleComments();
    });

    // Event listener for the "Download Image" button
    downloadImageButton.addEventListener('click', function () {
        downloadImage();
    });

    function generateRandomWaifu() {
        const selectedCategory = imageCategoryDropdown.value;
        // Fetch random waifu image from the waifu.pics API based on the selected category
        fetch(`https://api.waifu.pics/sfw/${selectedCategory}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const waifuImage = document.getElementById('waifuImage');
                waifuImage.src = data.url;

                // Only reset like count if it's a new image
                if (currentImageSrc !== data.url) {
                    likeCount = 0; // Reset like count when a new image is loaded
                    currentImageSrc = data.url;
                }

                updateLikeCount();
            })
            .catch(error => console.error('Error fetching waifu image:', error));
    }

    function addComment(commentText) {
        const commentItem = document.createElement('li');
        commentItem.className = 'comment';
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
    }

    function toggleComments() {
        const commentsSection = document.getElementById('commentsSection');
        commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    }

    function downloadImage() {
        const waifuImage = document.getElementById('waifuImage');
        const imageSrc = waifuImage.src;
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'random_waifu_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function updateLikeCount() {
        likeCountDisplay.textContent = `Likes: ${likeCount}`;
    }

    // Function to display messages on the page
    function displayMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message';
        messageContainer.textContent = message;
        document.body.appendChild(messageContainer);

        // Automatically remove the message after a short delay (e.g., 2 seconds)
        setTimeout(function () {
            document.body.removeChild(messageContainer);
        }, 2000);
    }
});















  //


  //






  