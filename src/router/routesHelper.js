import pages from '../pages';

const getNextAndPrev = (current) => {
  const routes = getRoutes();
  let currentIndex = routes.findIndex((r) => current && r.name === current.name);
  if (currentIndex === -1) {
    currentIndex = 0;
  }
  let prev = null;
  if (currentIndex !== 0) {
    prev = routes[currentIndex - 1];
  }
  let next;
  let nextIndex = currentIndex + 1;
  if (nextIndex !== routes.length) {
    next = routes[nextIndex];
  }
  return {
    next,
    prev
  };
};

const getRoutes = () => {
  const routes = [
    {
      path: '/',
      name: pages.main.name,
      label: pages.main.label,
      component: pages.main
    }
  ];
  pages.sections.forEach((section) => {
    section.pages.forEach((page) => {
      routes.push({
        path: '/' + page.name,
        name: page.name,
        // label is for navigation links, not related to router
        label: page.label || page.name,
        component: page
      });
    });
  });
  return routes;
};

export default {
  getNextAndPrev,
  getRoutes
};
