#!/bin/bash

main() {
    checkNode
    checkYarn
    createSimplerCert
    addCerts
    configureAppForCerts
    runYarn
    buttercupMe
}

runYarn() {
    yarn install
}

configureAppForCerts() {
    if [ -f ~/config.json ]; then
        echo "~/config.json existed, moving to config.json.bak"
        mv ~/config.json ~/config.json.bak
    fi
    ssl_path=`pwd`/ssl

cat > ~/config.json << CONFIG
{
  "https": {
    "cert": "$ssl_path/localhost.servercert.pem",
    "key": "$ssl_path/localhost.serverkey.pem"
  }
}
CONFIG
}

generateCertConfig() {
    if [ -f cert.server.cfg ]; then
        echo "Using existing SSL server config"
    else
        echo "Generating SSL server config..."
        username=`whoami`
        cat > cert.server.cfg << SSLServerConfigInput
HOME     = .
RANDFILE = \$ENV::HOME/.rnd

####################################################################
[ req ]
default_bits       = 2048
default_keyfile    = localhost.serverkey.pem
distinguished_name = server_distinguished_name
req_extensions     = server_req_extensions
x509_extensions    = server_req_extensions
string_mask        = utf8only

####################################################################
[ server_distinguished_name ]
countryName                     = Country Name (2 letter code)
countryName_default             = US
stateOrProvinceName             = State or Province Name (full name)
stateOrProvinceName_default     = Washington
localityName                    = Locality Name (eg, city)
localityName_default            = Bellevue
organizationName                = Organization Name (eg, company)
organizationName_default        = Expedia
organizationalUnitName          = Organizational Unit (eg, division)
organizationalUnitName_default  = Buttercup
commonName                      = Common Name (e.g. server FQDN or YOUR name)
commonName_default              = localhost
emailAddress                    = Email Address
emailAddress_default            = test@example.com

####################################################################
[ server_req_extensions ]
subjectKeyIdentifier = hash
basicConstraints     = CA:FALSE
keyUsage             = digitalSignature, keyEncipherment
subjectAltName       = @alternate_names
nsComment            = "OpenSSL Generated Certificate for Buttercup"

####################################################################
[ alternate_names ]
DNS.1 = localhost
DNS.2 = *.sandbox.dev.sb.karmalab.net
DNS.3 = *.$username.dev.sb.karmalab.net
SSLServerConfigInput
    fi
}
createSimplerCert() {
    echo "Creating certificates..."
    mkdir -p ssl
    cd ssl

    # Create private key
    openssl genrsa -des3 -out localhost.orig.serverkey.pem -passout pass:password 2048 2>/dev/null
    # Remove password
    openssl rsa -in localhost.orig.serverkey.pem -passin pass:password -out localhost.serverkey.pem 2>/dev/null
    # Remove password protected key
    rm localhost.orig.serverkey.pem

    generateCertConfig
    openssl req -batch -config cert.server.cfg -new -x509 -newkey rsa:2048 \
        -sha256 -nodes -keyout localhost.serverkey.pem -days 730 -out localhost.servercert.pem 2>/dev/null

    cd ..
    echo "Certificates created...OK"
    echo "You can find your certificates under ./ssl"
}

checkNode() {
    command -v node >/dev/null 2>&1 || { echo "Node is not installed" >&2; exit 1; }
    version_regex="s/^\([0-9]\.[0-9]\)\..*/\1/g"
    required_node_version=`cat .nvmrc | sed $version_regex`
    node_version=`node -v| sed s/v//g | sed $version_regex`
    if [ "${required_node_version}" != "$node_version" ]; then
        echo "WARNING: you have node $node_version and you need $required_node_version"
        echo "Compatibility is not guaranteed; please try the supported version before reporting issues."
        exit 1
    else
        echo "Node version....OK"
    fi
}

checkYarn() {
    command -v yarn >/dev/null 2>&1 || { echo "yarn is not installed" >&2; exit 1; }
    echo "Yarn installed...OK"
}

addCerts() {
    certificate_name="localhost.servercert.pem"
    operating_system=`uname -s`

    if [ "$operating_system" == "Linux" ]; then
        # https://askubuntu.com/a/94861
        linux_certificate_path="/usr/share/ca-certificates/expedia"
        linux_certificate_name="localhost.servercert.crt"

        echo "Converting .pem to .crt"
        openssl x509 -in "ssl/$certificate_name" -inform PEM -out "ssl/$linux_certificate_name"

        if [ -f "$linux_certificate_path/$linux_certificate_name" ]; then
            echo "Certificate already exists at $linux_certificate_path/$linux_certificate_name skipping registration"
        else
            echo "Registering certificate..."
            if [ ! -d "$linux_certificate_path" ]; then
                sudo mkdir "$linux_certificate_path"
            fi
            
            sudo cp -a "ssl/$linux_certificate_name" "$linux_certificate_path/$linux_certificate_name"

            echo "Reconfiguring CA certificates..."
            sudo dpkg-reconfigure ca-certificates
        fi
    else
        # Assume Mac
        echo "Adding new certs to keychain, please enter your password on the resulting dialog."
        keychain_path=`security list-keychains -d user | sed 's/.*"\(.*\)"/\1/g' | head -1` # Pick only first entry from keychains list
        security add-trusted-cert -r trustRoot -k "${keychain_path}" "ssl/$certificate_name"
    fi
}

buttercupMe() {
    echo "Welcome to buttercup!"

cat <<"BUTTERCUP"
                         `
                   ,#@@@@@@@@@+`
                 #@@@@@@@@@@@@@@@;
               #@@@@@@@@@@@#`#@@@@@:
             ,@@@@@@@@@@@@@@`'@@@@@@#
            '@@@@@@@@@@@#@#.``@@@@@@@@
           ;@@@@@@@@@@@:``````.'@#@@@@@
          `@@@@@@@@@@@@##:``.````:@@@@@;
          @@@@;,:@@@@@#.`.@.``.``',@#@@@
     ,@..+@@, ::'@@@@@@    ':``:+:'#.@@@+
     :@@@@@  ,::'@@@@@#.  `;```.,:@#  @@@
     ,@@@@@  ,:::@@@@@@#@@#:```:,,@@#  #@@+.
     .@@@@;  `:::'@@@@@@@@#````'::@@@@@@@@@
      @@@@:   ::::'@@@@@@@@````':::#@@@@@@#
   .###@@@;    ::::,;@@@@'`````:,::;@@@@@@
  '@;..'@@@     ,::::::::.``````::::,;:;@'
 .@``````##:      .:::,+````````@::::::+@
 #,```````#:,        ,'````+.`,``@,:::,@#
 @`````,'#@@`@.   `';`````.```.```;;::@@
.@```,@#,``@@``..`````````````:``````.#;
`@``,#.    .@+``````````````````````.##
 #.:#.      ,@@````````````````````;##
 :@@.        .@@:````````````````.@@'
               @#@'````````````:@##`
              ,@,+@#@@':,,:'@@#@@.,@.
              @@:,,:'#@@@@@@+,  @``.#
           .+@@@#@#;:@`         #```'#
          #@;@#@@@@@#+          @````#
         @@   '@@@@@@           @````@
        +@@   .#@@@@.          '@```:@
        @@@   ;@@@@#           ;@``.#,
       :@@@@` #::'@             @@@#,
       #@@@ .@@::#,
       #@#, @@#++@
       :@#.@@  `@
        #@#@   +;
         @    `#
       .@     @
      :@     +'
     ;#     ,#
    :@@@    #
   ,@@@@:  @.
   @@@@@``@;
   @@@#  @+
   @@@@`@+
   @@@@#,
    @@:

BUTTERCUP
    echo "You're ready to launch! Type 'yarn dev' and then visit https://localhost:8443/Hotels"
}
main "$@"
