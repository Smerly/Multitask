property stopVideo : "Stop Video"
property startVideo : "Start Video"

if application "zoom.us" is running then
	tell application "System Events"
		tell application process "zoom.us"
			if exists (menu item stopVideo of menu 1 of menu bar item "Meeting" of menu bar 1) then
				click menu item stopVideo of menu 1 of menu bar item "Meeting" of menu bar 1
				set returnValue to "Video off"
			else
				click menu item startVideo of menu 1 of menu bar item "Meeting" of menu bar 1
				set returnValue to "Video on"
			end if
		end tell
	end tell
else
	set returnValue to ""
end if

-- tell application "BetterTouchTool"

--     set_string_variable "zoomVideoState" to returnValue

-- end tell

return returnValue