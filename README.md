# michael-portfolio
portfolio

## Contact form

The contact form uses Netlify Forms, so submissions stay on the portfolio page and
are stored in the Netlify dashboard. To receive an email for every inquiry, open
the site in Netlify and go to **Forms > Form notifications > Add notification >
Email notification**, then enter the recipient email address.

If the form returns an HTTP error after a deploy, open **Netlify > Project
configuration > Forms** and confirm that form submissions are enabled. The form
must also be detected as `contact` in the Forms tab; if it is missing, trigger a
new deploy after ensuring `index.html` is included in the published directory.
