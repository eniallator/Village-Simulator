function serialise(a,b)local c={}local d=true;local e=""if not b then b=0 end;for f=1,b do e=e.." "end;local f=1;for g,h in pairs(a)do local i=""if g~=f then i="["..g.."] = "end;if type(h)=="table"then table.insert(c,i..serialise(a[g],b+2))d=false elseif type(h)=="string"then table.insert(c,i..'"'..a[g]..'"')else table.insert(c,i..tostring(a[g]))end;f=f+1 end;local j="{"if not d then j=j.."\n"end;for f=1,#c do if f~=1 then j=j..","if not d then j=j.."\n"end end;if not d then j=j..e.."  "end;j=j..c[f]end;if not d then j=j.."\n"..e end;return j.."}"end

function love.load(arg)
  -- body...
end

function love.update(dt)
  -- body...
end

function love.draw()
  -- body...
end
