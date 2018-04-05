@echo off
if exist ..\tops cd ..\..
if not exist lib\tools goto error2
call lib/tools/environment.cmd
set file=%1
if '%file%'=='' goto nofile
set subdir=%2
if '%subdir%'=='' goto nosubdir
    set source=%drupalsource%%subdir%\%file%
    set target=%projectroot%%subdir%
    goto start
:nosubdir
    set source=%drupalsource%%file%
    set target=%projectroot%
:start
    echo Updating from %source%
    echo to %target%
    if not exist %source% goto error1
    xcopy %source% %target% /y
    echo Updated %file%
    goto done
:nofile
    echo Specify a file name please
    goto end
:error1
    echo no source file: %source%
    goto end
:error2
    echo Must start in project root or lib\tools directory
    goto end
:done
    echo done.
:end