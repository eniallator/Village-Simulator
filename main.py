"""The main file where everything will run off of"""
import pygame

def main():
    pygame.init()

    # logo = pygame.image.load('image_path')
    # pygame.display.set_icon(logo)
    pygame.display.set_caption('Village simulator')

    screen = pygame.display.set_mode((960, 540))

    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

if __name__ == '__main__':
    main()
