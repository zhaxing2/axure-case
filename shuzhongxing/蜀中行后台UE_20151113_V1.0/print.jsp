<script>
window.onbeforeprint = new Function("document.all.pr.style.display='none'");
window.onafterprint = new Function("document.all.pr.style.display=''");
</script>
<body onprint="document.all.pr.display='none'">
are you sure print this word?
<input type=button onclick="window.print()" value="yes,print" id=pr>
</body> 