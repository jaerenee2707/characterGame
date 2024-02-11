function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");

      var city = document.getElementById(cityName);
      if (evt.currentTarget.classList.contains("active")) {
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        evt.currentTarget.className = evt.currentTarget.className.replace(" active", "");

      } else {
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        city.style.display = "block";
        evt.currentTarget.className += " active";
      }

    }
