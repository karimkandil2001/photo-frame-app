document.getElementById('image-upload').addEventListener('change', handleImageUpload);

// تحميل الفريم
const frame = new Image();
frame.crossOrigin = "Anonymous";  // إضافة crossOrigin لدعم CORS
frame.src = 'https://i.ibb.co/DPMc7bFL/frame-png.png'; // رابط الفريم

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            const canvasWidth = 600;  // عرض الصورة مع الفريم
            const canvasHeight = 600; // ارتفاع الصورة مع الفريم

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const imgWidth = img.width;
            const imgHeight = img.height;
            const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

            const x = (canvasWidth - imgWidth * scale) / 2;
            const y = (canvasHeight - imgHeight * scale) / 2;

            // رسم الصورة على canvas بحجم مناسب
            ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
            // رسم الفريم فوق الصورة
            ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);

            // تحويل الصورة إلى Base64
            const dataURL = canvas.toDataURL('image/png');
            document.getElementById('image-preview').src = dataURL;
            document.getElementById('image-preview').style.display = 'block';
            document.getElementById('download-btn').style.display = 'inline-block';
            document.getElementById('new-image-btn').style.display = 'inline-block'; // إظهار زر إنشاء صورة جديدة
            
            // تحميل الصورة عند الضغط على الزر
            document.getElementById('download-btn').addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'image_with_frame.png';
                link.click();
            });
        };
    };
    reader.readAsDataURL(file);
}

// وظيفة زر "إنشاء صورة جديدة"
document.getElementById('new-image-btn').addEventListener('click', function() {
    // إعادة تعيين كل شيء
    document.getElementById('image-upload').value = ''; // مسح الصورة الحالية
    document.getElementById('image-preview').style.display = 'none'; // إخفاء الصورة المعروضة
    document.getElementById('download-btn').style.display = 'none'; // إخفاء زر التحميل
    document.getElementById('new-image-btn').style.display = 'none'; // إخفاء زر "إنشاء صورة جديدة"
});
