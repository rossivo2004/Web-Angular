function nav_mobile() {
  const btn = document.querySelector('.btn_nav__mobile');
  const nav = document.querySelector('.nav_menu__mobile');
  const btn_closed = document.querySelector('.btn_closed_nav-mobile'); // Missing dot before class
  const disclosure_1 = document.querySelector('#disclosure-1');
  const disclosure_1__btn = document.querySelector('.btn_disclosure');

  // Check if all required elements exist
  if (!btn || !nav || !btn_closed || !disclosure_1 || !disclosure_1__btn) {
    // console.error("One or more required elements not found.");
    return;
  }

  let isOpen = false; // Variable to keep track of the current state of the nav

  btn.addEventListener('click', () => {
    if (isOpen) {
      nav.style.transform = 'translateX(100%)'; // If nav is open, move it to the right
    } else {
      nav.style.transform = 'translateX(0)'; // If nav is not open, display it
    }
    isOpen = !isOpen; // Toggle state
  });

  // Close the menu when clicking the close button
  btn_closed.addEventListener('click', () => {
    nav.style.transform = 'translateX(100%)'; // Move to the right to hide the menu
    isOpen = false; // Update isOpen state
  });

  // Hide menu by default when page loads
  nav.style.transform = 'translateX(100%)';

  // Set default display to none
  disclosure_1.style.display = 'none';

  disclosure_1__btn.addEventListener('click', () => {
    if (disclosure_1.style.display === 'none') {
      disclosure_1.style.display = 'block';
    } else {
      disclosure_1.style.display = 'none';
    }
  });
}
nav_mobile();



let slideIndex = 1; // Declare slideIndex globally
let slideInterval;

function plusSlides(n) {
  clearInterval(slideInterval); // Stop automatic slide change
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearInterval(slideInterval); // Stop automatic slide change
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return; // Check if there are no slides

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


function home_slider() {
  showSlides(slideIndex);
  slideInterval = setInterval(function () {
    plusSlides(1); // Change slide every 8 seconds
  }, 8000); // 8 seconds
}

home_slider();


function ctrl_hd__scroll() {
  const btn = document.querySelector('.btn_ctrl__hd-sc');
  const btn_x = document.querySelector('.header_scroll__input-closed');
  const header_scroll__input = document.querySelector('.header_scroll__input');
  const header_scroll__big = document.querySelector('.header_scroll__big');
  const header_scroll = document.querySelector('.header_scroll');

  // Check if all required elements exist
  if (!btn || !btn_x || !header_scroll__input || !header_scroll__big || !header_scroll) {
    // console.error("One or more required elements not found.");
    return;
  }

  let isOpen = true;

  btn.addEventListener('click', () => {
    if (isOpen) {
      header_scroll__input.style.display = 'block';
      header_scroll__big.style.display = 'none';
      isOpen = false;
    } else {
      header_scroll__input.style.display = 'none';
      header_scroll__big.style.display = 'block';
      isOpen = true;
    }
  });

  btn_x.addEventListener('click', () => {
    header_scroll__input.style.display = 'none';
    header_scroll__big.style.display = 'flex';
    isOpen = true;
  });

  let scrollThreshold = 250;
  let isScrolling = false;

  // Throttle scroll event for performance
  function throttleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollThreshold < currentScrollTop) {
          header_scroll.style.transform = 'translateY(0)';
        } else {
          header_scroll.style.transform = 'translateY(-100%)';
        }

        isScrolling = false;
      });

      isScrolling = true;
    }
  }

  window.addEventListener('scroll', throttleScroll);
}
ctrl_hd__scroll();


function open_cart() {
  // Kiểm tra sự tồn tại của các phần tử trên trang
  let btn = document.querySelectorAll('.btn_box__tranform');
  let box_tranform = document.querySelector('.box_tranform');
  let overplay = document.querySelector('.box_tranform-overplay');
  let btn_closed = document.querySelectorAll('.btn_closed__box-tranfrom');

  // Xác định phần tử mục tiêu bằng cách sử dụng một lớp hoặc một ID độc nhất
  if (btn && box_tranform && overplay && btn_closed) {
    btn.forEach(item => {
      item.addEventListener('click', () => {
        overplay.style.display = 'block';
        box_tranform.style.transform = 'translateX(0)';
      });
    });

    btn_closed.forEach(item => {
      item.addEventListener('click', () => {
        overplay.style.display = 'none';
        box_tranform.style.transform = 'translateX(1000px)';
      });
    });

    overplay.addEventListener('click', (event) => {
      // Check if the click event originated from the box_tranform area or not
      if (!box_tranform.contains(event.target)) {
        overplay.style.display = 'none';
        box_tranform.style.transform = 'translateX(1000px)';
      }
    });
  }
}

// Kiểm tra xem hàm này có được gọi từ trang hiện tại hay không
if (document.readyState === 'complete') {
  open_cart();
} else {
  window.addEventListener('load', open_cart);
}



function open_opacity() {
  let box = document.querySelector('.box_opacity');
  let btn_opacity = document.querySelector('.btn_opacity');

  // Kiểm tra xem cả box và btn_opacity có tồn tại không
  if (box && btn_opacity) {
    btn_opacity.addEventListener('click', () => {
      if (box.style.opacity === '1' || box.style.opacity === '') {
        box.style.opacity = '0';
      } else {
        box.style.opacity = '1';
      }
    });
  }
}

open_opacity();


function shop_filter__box() {
  let box = document.querySelector('.shop_filter__box');
  let overplay = document.querySelector('.shop_filter__overplay');
  let btn = document.querySelector('.shop_filter__btn');
  let btnClosed = document.querySelector('.shop_filter__btnClosed');

  // Kiểm tra xem tất cả các phần tử có tồn tại không
  if (box && overplay && btn && btnClosed) {
    btn.addEventListener('click', () => {
      box.style.transform = 'translateX(0)';
      overplay.style.display = 'block';
      open_opacity(); // Gọi hàm để xử lý hiệu ứng opacity khi mở hộp bộ lọc
    });

    btnClosed.addEventListener('click', () => {
      box.style.transform = 'translateX(100%)';
      overplay.style.display = 'none';
    });
  }
}

shop_filter__box();


function setupImageGallery() {
  document.addEventListener("DOMContentLoaded", function () {
    var mainImg = document.getElementById("productPage_img__main");
    var thumbnails = document.getElementsByClassName("productPage_thumbnail");

    for (var i = 0; i < thumbnails.length; i++) {
      thumbnails[i].addEventListener("click", function () {
        var clickedImgSrc = this.src;
        mainImg.src = clickedImgSrc;
      });
    }
  });
}

// Gọi hàm setupImageGallery() để khởi tạo gallery
setupImageGallery();

function setupQuantityInputs() {
  var decrementButtons = document.querySelectorAll('.decrement-button');
  var incrementButtons = document.querySelectorAll('.increment-button');
  var quantityInputs = document.querySelectorAll('.quantity-input');

  // Lặp qua từng cặp nút giảm và tăng
  decrementButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      var currentValue = parseInt(quantityInputs[index].value);
      if (currentValue > 1) {
        quantityInputs[index].value = currentValue - 1;
      }
    });
  });

  incrementButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      var currentValue = parseInt(quantityInputs[index].value);
      quantityInputs[index].value = currentValue + 1;
    });
  });
}

// Gọi hàm setupQuantityInputs() để thiết lập chức năng tăng giảm số lượng cho tất cả các cặp nút
setupQuantityInputs();

function move_content() {
  var tab_nav = document.querySelectorAll(".nav-list_item");
  var tab_content = document.querySelectorAll(".content-box");

  tab_nav.forEach((item, index) => {
    item.addEventListener("click", function () {
      // Loại bỏ lớp active từ tất cả các tab và nội dung
      tab_nav.forEach(nav => nav.classList.remove("active"));
      tab_content.forEach(content => content.classList.remove("active"));

      // Thêm lớp active cho tab được nhấp và nội dung tương ứng
      this.classList.add("active");
      tab_content[index].classList.add("active");
    });
  });
}

move_content();


function setupBoxArea() {
  var boxA = document.querySelector(".productDetail_btn__a");
  var boxB = document.querySelector(".productDetail_btn__b");
  var areaA = document.querySelector(".productDetail_area__a");
  var areaB = document.querySelector(".productDetail_area__b");

  // Ẩn area B mặc định
  toggleBox(boxB, areaB, false);

  if (boxA && boxB && areaA && areaB) {
    boxA.addEventListener("click", function () {
      toggleBox(boxA, areaA, true);
      toggleBox(boxB, areaB, false);
    });

    boxB.addEventListener("click", function () {
      toggleBox(boxB, areaB, true);
      toggleBox(boxA, areaA, false);
    });
  } else {
    // console.error("One or more elements are missing.");
  }
}

function toggleBox(box, area, isActive) {
  if (box && area) {
    if (isActive) {
      box.classList.add("active");
      area.style.display = "block";
    } else {
      box.classList.remove("active");
      area.style.display = "none";
    }
  }
}

// Gọi hàm setupBoxArea() để thiết lập chức năng cho box và area
setupBoxArea();


function changeImg_profile() {
  const imageInput = document.getElementById('profile_imageInput');
  const previewImage = document.getElementById('profile_previewImg');

  // Kiểm tra xem các phần tử HTML tồn tại trước khi thêm sự kiện lắng nghe
  if (imageInput && previewImage) {
    imageInput.addEventListener('change', function () {
      const file = this.files[0]; // Lấy tệp ảnh được chọn (chỉ lấy tệp đầu tiên nếu có nhiều tệp được chọn)

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          previewImage.src = e.target.result; // Đặt src của thẻ img thành đường dẫn của tệp ảnh được chọn
        };

        reader.readAsDataURL(file); // Đọc tệp ảnh dưới dạng Data URL
      }
    });
  }
}

// Gọi hàm changeImg_profile() sau khi tất cả các phần tử đã được tải
window.onload = function () {
  changeImg_profile();
};


// Hàm dropdown sau khi click
function dropdowns() {
  const btn_dropdown = document.querySelectorAll('.btn_dropdown');
  const box_dropdown = document.querySelectorAll('.box_dropdown');

  btn_dropdown.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      box_dropdown[index].style.display = box_dropdown[index].style.display === 'block' ? 'none' : 'block';
    })
  })
}
dropdowns()

// function amdin_product_toast() {
//     const toastSuccess = document.getElementById('toast-success');
//     // Tự động ẩn đi toast sau 3 giây
//     setTimeout(() => {
//         toastSuccess.style.display = 'none';
//     }, 3000);
// }
// amdin_product_toast()

function popupSuccess(message) {
  const popup = document.createElement('div');
  popup.className = "popup popupSuccess";
  popup.innerHTML = `
        <div class="w-[420px] h-[240px] bg-bg_popup rounded-lg flex items-center justify-center flex-col">
            <i class="fa-solid fa-circle-check text-7xl text-green-500 mb-3"></i>
            <p class="text-white font-bold text-xl popup_content">${message}</p>
        </div>
    `;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.display = 'none';
    document.body.removeChild(popup);
  }, 3000);
}

// popupSuccess("Thanh toán thành công");

function popupError(message) {
  const popup = document.createElement('div');
  popup.className = "popup popupError";
  popup.innerHTML = `
        <div class="w-[420px] h-[240px] bg-bg_popup rounded-lg flex items-center justify-center flex-col">
            <i class="fa-solid fa-circle-xmark text-7xl text-red-500 mb-3"></i>
            <p class="text-white font-bold text-xl popup_content">${message}</p>
        </div>
    `;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.display = 'none';
    document.body.removeChild(popup);
  }, 3000);
}

// popupError("Thanh toán thất bại");




var boxShown = true;
function toggleBoxCoupon() {
  var box = document.querySelector(".coupon_checkout");

  if (box) {
    if (boxShown) {
      box.style.display = "block";
      setTimeout(function () {
        box.style.height = "120px";
      }, 100);
    } else {
      box.style.height = "0px";
      setTimeout(function () {
        box.style.display = "none";
      }, 200);
    }
    boxShown = !boxShown;
  } else {
    return;
  }


}

function button_return__top() {
  var button_return__top = document.querySelector('.button_return__top');
  var scrollThreshold = 700;

  if (button_return__top) {
    button_return__top.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', function () {
      var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop < scrollThreshold) {
        button_return__top.classList.add('hidden_btn');
      } else {
        button_return__top.classList.remove('hidden_btn');
      }
    });
  }

}
button_return__top();
