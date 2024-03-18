<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="http://creative-tim.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Бидэнтэй холбогдох
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://www.creative-tim.com/presentation"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Танилцуулга татах
          </a>
        </li>
        <li class="nav-item">
          <a
            href="http://blog.creative-tim.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Хаяг байршил, цагийн хуваарь харах
          </a>
        </li>
      </ul>
      <div class="copyright">
        &copy; {{ year }}, 
        <a
          href="http://measurement.mn/tamadum-system"
          target="_blank"
          rel="noopener"
          >МЭЙЖҮРМЭНТ ХХК</a
        >
        Зохиогчийн эрх хамгаалагдсан.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
