var printAudio = new Audio('./take-photo.mp3');
var photo = document.getElementById('photo');
var cover = document.getElementById('cover');
var takePhoto = document.getElementById('take-photo');

takePhoto.addEventListener('click', function() {
    photo.style.animation = 'print 4.5s both';
    cover.style.animation = 'show  2s 4.5s both';
    cover.style.opacity = 0;
    printAudio.play();
});
