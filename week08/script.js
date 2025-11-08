const infoDropdown = document.getElementById('infoDropdown');
const infoText = document.getElementById('infoText');


infoDropdown.addEventListener('change', function() {
 const value = this.value;


 if (value === 'oulipo') {
   infoText.innerHTML = `
     A mid-20th-century French literary group that believed constrained techniques enhance creativity.
     Members used mathematical, structural, and puzzle-like restrictions to produce new forms of writing.
   `;//SOURCE:
   infoText.style.display = 'block';
 }
 else if (value === 'artist') {
   infoText.innerHTML = `
     “I wanted it to be a very simple presentation only using a few lines of code.
     There’s nothing to it; it’s just a drop-down menu. I didn't want the terms to link anywhere.
     I made it so that if anything was selected, it would go back to the index.
     This was a kind of refusal. You could see what I was interested in,
     but you wouldn't get to see anything more.”
   `; //SOURCE: https://rhizome.org/editorial/2017/dec/15/growing-up-google-martine-syms/
   infoText.style.display = 'block';
 }
 else {
   infoText.style.display = 'none';
 }
});












