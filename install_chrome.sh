# install_chrome.sh
set -ex

CHROME_VERSION=google-chrome-stable_current_amd64.deb

# Download Chrome
wget https://dl.google.com/linux/direct/$CHROME_VERSION

# Install Chrome
dpkg -i $CHROME_VERSION || apt-get -f install -y
rm $CHROME_VERSION
