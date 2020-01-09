import React from 'react';
import { FaSearch } from "react-icons/fa";
import { Button, FormInput, InputGroup, InputGroupAddon, InputGroupText } from "shards-react";

export default function BarreRecherche()
{
    return(
        <div>
            <InputGroup seamless>
                <InputGroupAddon type="append">                  
                    <InputGroupText>
                        <FormInput placeholder="Recherche module ..."/>  
                        <Button ><FaSearch /></Button>
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}