#!/bin/sh
zip build/app.nw *.html *.css *.js *.dat fonts/* package.json bower_components/**/*
open build/app.nw
