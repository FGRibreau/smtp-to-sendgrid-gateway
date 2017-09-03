#!/usr/bin/env expect

log_user 1                   ;# turn off the usual output

#If it all goes pear shaped the script will timeout after 20 seconds.
set timeout 20
set from [lindex $argv 0]
set to [lindex $argv 1]

spawn telnet localhost smtp

expect "220 *"
send "HELO client\n"
expect "250 *"
send "MAIL FROM:<$from>\n"
expect "250 *"
send "RCPT TO:<$to>\n"
expect "250 *"
send "DATA\n"
expect "354 *"
send "Subject: smtp-to-sendgrid-gateway test\n"
send "\n"
send "Corps du texte\n"
send ".\n"
expect "250 *"
send "QUIT"
