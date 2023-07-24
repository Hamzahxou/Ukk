// menu di hp
const header = document.querySelector("header");
const menu = document.querySelector("header .menu");
const navMenu = document.querySelector("header nav");
// ketika element menu di klik beri kondisi
menu.addEventListener("click", () => {
  navMenu.classList.toggle("active"); // kondisi beri class active pada nav
});

//kondisi menu pisah
const sections = document.querySelectorAll("section");
function setActive(index) {
  sections.forEach((section, i) => {
    section.classList.toggle("notActive", i !== index);
    // jika i sama dengan index maka class notActive adalah remove
    // jika i tidak sama dengan index maka class notActive adalah add
  });
}

//kondisi active menu
const menulink = document.querySelectorAll("ul li a");
menulink.forEach((satu, index) => {
  satu.addEventListener("click", (e) => {
    e.preventDefault();

    setActive(index);
    menulink.forEach((dua) => {
      dua.classList.remove("active"); // saat di klik buat semua nya remove class acive
    });
    satu.classList.add("active"); // yang di klik beri class active
  });
});

// img Galeri click
const ProjectImg = document.querySelectorAll("img.ProjectImg");
ProjectImg.forEach((e) => {
  e.addEventListener("click", () => {
    // Menghapus kelas "active" dari semua elemen dengan kelas "boxProject"
    document.querySelectorAll(".boxProject").forEach((box) => {
      box.classList.remove("active");
    });

    // Menambahkan kelas "active" pada elemen terkait
    const boxProject = e.parentElement.querySelector(".boxProject");
    boxProject.classList.add("active");

    // Menambahkan event jika close di klik
    const close = e.parentElement.querySelector(".close");
    close.addEventListener("click", () => {
      boxProject.classList.remove("active");
    });
  });
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".boxProject").forEach((box) => {
    box.classList.remove("active");
  });
});
// localStorage
const DatabaseTugas = localStorage.getItem("tugas");
// tambah tugas kalo kuat
const formList = document.forms["formList"];
const inputTugas = formList.elements["tugas"];
const TaskList = document.querySelector(".Task");

if (DatabaseTugas) {
  TaskList.innerHTML = DatabaseTugas;
}

formList.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTugas.value.trim() === "") {
    // alert("kosong");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "tidak boleh kosong",
    });
  } else if (cekTugas(inputTugas.value.trim())) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tugas sudah ada",
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "berhasil menambahkan tugas",
    });

    const listBaru = document.createElement("li");
    listBaru.textContent = inputTugas.value;
    listBaru.id = "namaTugas";
    TaskList.appendChild(listBaru);

    inputTugas.value = "";
    localStorage.setItem("tugas", TaskList.innerHTML);
  }

  tugascekKosongga();
});
function cekTugas(tugas) {
  const listItems = TaskList.querySelectorAll("li");
  let datakembar = false;

  listItems.forEach((listItem) => {
    if (listItem.textContent.trim() === tugas) {
      datakembar = true;
    }
  });

  return datakembar;
}

function tugascekKosongga() {
  const listTugas = document.querySelectorAll(".Task li");
  let k = document.querySelector(".testt");
  if (listTugas.length === 0) {
    k.style.display = "block";
    k.textContent = "hebat semua tugas kelar";
  } else {
    k.style.display = "none";
  }
}

tugascekKosongga();
TaskList.addEventListener("click", (e) => {
  const targetTugas = e.target;
  if (targetTugas.matches("#namaTugas")) {
    Swal.fire({
      title: "kamu yakin?",
      text: "ingin menghapus tugas ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Ya hapus!",
      cancelButtonText: "Ga jadi!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "terhapus!",
          text: "1 Tugas telah kelar.",
          confirmButtonColor: "#28a745",
          confirmButtonText: "Horee",
        }).then((result) => {
          if (result.isConfirmed) {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
              emojis: [
                "🔴",
                "🟠",
                "🟡",
                "🟢",
                "🔵",
                "🟣",
                "🟤",
                "🔘",
                "⚫",
                "⚪",
                "🟥",
                "🟧",
                "🟨",
                "🟩",
                "🟦",
                "🟪",
                "🟫",
                "⬛",
                "⬜",
                "◼️",
                "◾",
                "◽",
                "▪️",
                "▫️",
                "🔶",
                "🔸",
                "🔷",
                "🔹",
                "🔺",
                "🔻",
                "🔲",
                "🔳",
              ],
            });
          }
        });
        targetTugas.remove();
        localStorage.setItem("tugas", TaskList.innerHTML);
        tugascekKosongga();
      }
    });
  }
});

//ketika gambar Profile di klik
const imgProfile = document.querySelector("section.home .imgProfile");
const priview = document.querySelector("section.home .priview");
const contentPriview = document.querySelector(".priview .contentPriview");
if (window.innerWidth >= 576) {
  imgProfile.addEventListener("click", () => {
    priview.classList.add("active");
    priview.addEventListener("click", (e) => {
      if (!contentPriview.contains(e.target)) {
        priview.classList.remove("active");
      }
    });
    window.addEventListener("scroll", () => {
      priview.classList.remove("active");
    });
  });
}
if (window.innerWidth <= 576) {
  priview.classList.remove("active");
}
// darkmode
const darkmode = document.querySelector(".darkmode");
darkmode.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");
  if (body.classList == "dark") {
    imgProfile.src = "../img/dark.png";
  } else {
    imgProfile.src = "../img/light.png";
  }
});

//loadingHalo
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const kataKata = [
  { kata: "Halo", delay: 400 },
  { kata: "Hallo", delay: 500 },
  { kata: "مرحبا", delay: 300 },
  { kata: "你好", delay: 400 },
  { kata: "Bonjour", delay: 300 },
  { kata: "Ciao", delay: 300 },
  { kata: "こんにちは", delay: 400 },
];
const loadingHalo = document.querySelector(".loadingHalo");
let index = 0;

function loading() {
  setTimeout(() => {
    loadingHalo.textContent = kataKata[index].kata;
    index++;
    if (index < kataKata.length) {
      loading();
    } else {
      loadingHalo.style.transform = "translateY(-100%)";
      header.classList.add("reappear");
      main.classList.add("reappear");
      darkmode.classList.add("reappear");
      footer.classList.add("reappear");
      AOS.init();
      // salam
      new TypeIt("#textKetik", {
        strings: "Selamat datang di website saya",
        speed: 200,
        loop: true,
      }).go();
    }
  }, kataKata[index].delay);
}

window, addEventListener("DOMContentLoaded", loading);
