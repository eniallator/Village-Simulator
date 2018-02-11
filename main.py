"""The main file where everything will run off of"""
import pyglet
from src.Villager import Villager

window = pyglet.window.Window()
label = pyglet.text.Label('Test message', x=window.width//2, y=window.height//2, anchor_x='center', anchor_y='center')
villager = Villager()

# @window.event
# def on_key_press(symbol, modifiers):
#     print(symbol, 'was pressed')

# @window.event
# def on_mouse_press(x, y, button, modifiers):
#     print(button, 'mouse was clicked')

window.push_handlers(pyglet.window.event.WindowEventLogger())

@window.event
def on_draw():
    window.clear()
    label.draw()
    villager.sprite.blit(0, 0)

pyglet.app.run()
