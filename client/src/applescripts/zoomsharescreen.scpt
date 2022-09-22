property startShare: "Start share"
property stopShare: "Stop share"

if application "zoom.us" is running then
    tell application "System Events"
        tell application process "zoom.us"
            if exists (menu item startShare of menu 1 of menu bar item "Meeting" of menu bar 1) then
                click menu item startShare of menu 1 of menu bar item "Meeting" of menu bar 1
                set returnValue to "Sharing"
            else
                click menu item stopShare of menu 1 of menu bar item "Meeting" of menu bar 1
                set returnValue to "Stopped sharing"
            end if
        end tell
    end tell
else
	set returnValue to ""
end if
