import pyglet

VILLAGER_IMG = pyglet.resource.image('assets/images/villager/still.png')

class Villager():
    """The Villager class"""

    def __init__(self):
        self.sprite = VILLAGER_IMG
        self.x = 100
        self.y = 100
        self.width = 8
        self.height = 24
        self.move_speed = 5
