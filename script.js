//A Responsive Neural network interconnected design UI( User Interface) amd UX(User Experience.

// INSTRUCYIONS TO UNDERSTAND BETTER

//In this project, it support both mobile and desktop version, each node has a background color that transitions from blue to magenta to pink. Additionally, lines (connectors) are drawn between each pair of nodes, and the connectors have a gradient background.

        const space = document.getElementById('space');
        const networkContainer = document.getElementById('network-container');

        createSpaceBackground();
        const nodes = createNodes(10);
        connectNodes(nodes);

        function createSpaceBackground() {
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'sparkle';
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                space.appendChild(star);
            }
        }

        function createNodes(nodeCount) {
            const createdNodes = [];

            for (let i = 0; i < nodeCount; i++) {
                const node = createNode(i + 1);
                createdNodes.push(node);
                networkContainer.appendChild(node);
            }

            return createdNodes;
        }

        function createNode(index) {
            const node = document.createElement('div');
            node.className = 'node';
            node.textContent = `${index}`;
            node.style.top = `${Math.random() * 80 + 10}%`;
            node.style.left = `${Math.random() * 80 + 10}%`;
            node.style.background = `linear-gradient(90deg, blue, magenta, pink)`;

            node.addEventListener('mousedown', startConnect);
            node.addEventListener('dragstart', () => false); // Disable default drag behavior

            return node;
        }

        function connectNodes(nodes) {
            nodes.forEach(startNode => {
                nodes.forEach(endNode => {
                    if (startNode !== endNode) {
                        const connector = document.createElement('div');
                        connector.className = 'connector';
                        networkContainer.appendChild(connector);

                        const startPosition = getCenterPosition(startNode);
                        const endPosition = getCenterPosition(endNode);

                        const angle = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x);
                        const distance = Math.hypot(endPosition.y - startPosition.y, endPosition.x - startPosition.x);

                        connector.style.width = `${distance}px`;
                        connector.style.transform = `rotate(${angle}rad) translateX(-50%)`;
                        connector.style.top = `${startPosition.y}px`;
                        connector.style.left = `${startPosition.x}px`;
                    }
                });
            });
        }

        function startConnect(event) {
            const connector = document.createElement('div');
            connector.className = 'connector';
            networkContainer.appendChild(connector);

            const startNode = event.target;
            const startPosition = getCenterPosition(startNode);

            let isConnecting = true;

            document.addEventListener('mousemove', connect);

            document.addEventListener('mouseup', () => {
                if (isConnecting) {
                    stopConnect();
                }
            });

            function connect(event) {
                if (isConnecting) {
                    const angle = Math.atan2(event.clientY - startPosition.y, event.clientX - startPosition.x);
                    const distance = Math.hypot(event.clientY - startPosition.y, event.clientX - startPosition.x);

                    connector.style.width = `${distance}px`;
                    connector.style.transform = `rotate(${angle}rad) translateX(-50%)`;
                }
            }

            function stopConnect() {
                isConnecting = false;
                connector.style.width = '0';
                networkContainer.removeChild(connector);

                document.removeEventListener('mousemove', connect);
            }
        }

        function getCenterPosition(element) {
            const rect = element.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
    