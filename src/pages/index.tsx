import React, { ComponentType, SVGProps } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import docMeta from '@site/src/docMeta.json';
import HandGlobe from '@site/static/img/handglobe.svg';
import HandShake from '@site/static/img/handshake.svg';
import GroupPeople from '@site/static/img/grouppeople.svg';
import Card from '../components/card';
import config from '@site/src/config.json';


const allowedDirsByRole = config.allowedDirsByRole;

export default function HomePage() {
  const role = localStorage.getItem("role");
  const resolvedRole = role;

  const filteredDocs = docMeta.filter((doc) =>
    allowedDirsByRole[resolvedRole]?.includes(doc.folder)
  );

  const groupedDocs = [];

  const filteredDocsByRole = docMeta
    .filter((doc) => allowedDirsByRole[resolvedRole]?.includes(doc.folder))
    .map((doc) => {
      const parts = doc.docId.split('/');
      const role = parts[0]; // "developer", "superadmin", etc.
      const subHeader = parts.length > 2 ? parts[1] : parts[0]; // e.g., "Frontend", "Backend", or same as role
      return {
        ...doc,
        role,
        subHeader,
      };
    });

  const roleMap = {};

  filteredDocsByRole.forEach((doc) => {
    const { role, subHeader, title, docId } = doc;

    if (!roleMap[role]) {
      roleMap[role] = {};
    }

    if (!roleMap[role][subHeader]) {
      roleMap[role][subHeader] = [];
    }

    roleMap[role][subHeader].push({
      title,
      link: docId,
    });
  });

  // Final structured array
  const structuredOutput = Object.entries(roleMap).map(([role, subHeaders]) => ({
    header: role,
    subHeaders: Object.entries(subHeaders).map(([subHeader, items]) => ({
      subHeader,
      items,
    })),
  }));

  const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    HandGlobe,
    HandShake,
    GroupPeople,
  };
  
  const cardData = config.cardData.map(card => ({
    ...card,
    svg: iconMap[card.svg],
  }));

  const subSectionData = config.subSectionData;

  return (
    <Layout title="Welcome">
      <main style={{ padding: '1.25rem',display:'flex',columnGap: "50px",flexWrap:"wrap"}}>
        <h1 style={{flex:"0 0 100%"}}>Documentation</h1>
        {structuredOutput.map((role) => (
          <div className="role-section" key={role.header}>
            <p style={{textTransform:"capitalize",color:"gray",marginBottom:"10px"}}>{role.header+"-docs"}</p>
            {role.subHeaders.map((sub) => (
              <div className="sub-section" style={{marginBottom:"10px"}} key={sub.subHeader}>
                <p style={{marginBottom:"0",textTransform:"capitalize"}}>{sub.subHeader === "client" ? "Products":sub.subHeader}</p>
                {sub.items.map((item) => (
                  <a style={{display:"block",textTransform:"capitalize"}} key={item.link} href={`/docs/${item.link}`}>{item.title}</a>
                ))}
              </div>
            ))}
          </div>
        ))}
        {/* <div className="cls-footer-content-container">
          <div className="cls-footer-content">
            <h1>👋 Hi, {resolvedRole !== 'guest' ? `${resolvedRole}` : ''}</h1>
            <p>Here is your available docs:</p>

            {filteredDocs.length ? (
              <ul>
                {filteredDocs.map((doc) => (
                  <li key={doc.docId}>
                    <Link to={`/docs/${doc.docId}`}>{doc.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No docs available for your role.</p>
            )}
          </div>
        </div> */}
        {/* <div className='cls-home-container'>
          <div className="cls-home-content">
            <h1>Who We Are</h1>
            <p>At Infiniti, our mission is clear: to simplify and elevate the travel industry through continuous innovation and unwavering dedication. We thrive on collaboration with fellow travel enthusiasts who share our passion for change. Join us in shaping the future of travel technology – together.</p>
          </div>
        </div> */}
        {/* <div className="cls-home-cards">
          {cardData.map((card, index) => (
            <Card
              key={index}
              svg={card.svg}
              className='cls-card'
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div className="cls-home-benefits-container">
          <div className="cls-home-benefits">
            <p className='cls-home-benefits-title'>{subSectionData.title}</p>
            <h1 className='cls-home-benefits-header'>{subSectionData.header}</h1>
            <div className="cls-home-benefits-cover">
              {subSectionData.data.map((sub,index)=>(
                <div key={index} className="cls-home-benefits-content">
                  <h3>{sub.title}</h3>
                  <p>{sub.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </main>
    </Layout>
  );
}
