document
  .getElementById("add_user")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Data Inserted Successfully!");
  });

document
  .getElementById("update_user")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    unindexed_array.forEach(function (n, i) {
      data[n.name] = n.value;
    });

    var request = {
      url: `http://localhost:3000/api/users/${data.id}`,
      method: "PUT",
      data: data,
    };

    $.ajax(request).done(function (response) {
      alert("Data Updated Successfully!");
    });
  });

if (window.location.pathname === "/") {
  var $ondelete = document.querySelectorAll(".table tbody td a.delete");
  $ondelete.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();

      var id = element.getAttribute("data-id");

      var request = {
        url: `http://localhost:3000/api/users/${id}`,
        method: "DELETE",
      };

      if (confirm("Do you really want to delete this record?")) {
        $.ajax(request).done(function (response) {
          alert("Data Deleted Successfully!");
          location.reload();
        });
      }
    });
  });
}
