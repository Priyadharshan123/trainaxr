<script>
document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("demoForm");
  const apiBase = document.getElementById("api_url").value;
  const ipField = document.getElementById("ipaddress");
  const jwtField = document.getElementById("jwtToken");

  // 1️⃣ Fetch user IP
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ipField.value = data.ip;
  } catch (err) {
    console.log("IP fetch failed:", err);
  }

  // 2️⃣ Get JWT
  try {
    const res = await fetch(apiBase + "authorize/index.php");
    const data = await res.json();
    if (data.status === "success") {
      jwtField.value = data.data.token;
    }
  } catch (err) {
    console.log("JWT fetch failed:", err);
  }

  // 3️⃣ Handle form submit
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const res = await fetch(apiBase + "save-request-details.php", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.status) {
        alert("✅ Data saved successfully!");
        form.reset();
      } else {
        alert("❌ " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
    
  });
});
</script>
